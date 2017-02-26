# Attribute Adapter

Overview
----
When you work with a typed language like typescript, some times you can need to make some data cast over the result set that comes from a connection or a store. This library implements something like the JPA AttributeConverter solution, using all power given by typescript.

Using
----
First thing you'll need to implement an AttributeConverter, like this:

```typescript
import { AttributeAdapter } from 'attr-adapter';

// I don't want to instantiate a Date object each time I receive an attribute with a date value.
class StringToDateConverter implements AttributeConverter<string, Date> {
    toApplication(castMe: string): Date {
        if (castMe == null)
            return null;

        return new Date(castMe);
    }

    toServer(castMe: Date): string  {
        if (castMe == null)
            return null;
        
        let d: number|string   = castMe.getDate();
        let m: number|string   = castMe.getMonth() + 1;
        const Y: number|string = castMe.getFullYear();

        d = d <= 9? `0${d}` : d;
        m = m <= 9? `0${m}` : m;

        return `${Y}-${m}-${d}`;
    }
}
```

Then, now, you need a classe that represents something that comes from anywhere, like a JSON that comes from a server or sessionStorage, any external place where typescript can't garantee the class signature.

```typescript
import { AttributeAdapter, ResultSetModel } from 'attr-adapter';
import { StringToDateConverter } from './string-to-date.converter';

// This is just a piece of JPA, implemented with vague similarity, so, this is not an @Entity, but just a resultset of wherever that comes from wherever
class Person extends ResultSetModel {
 
    //  you need initialize all object properties with null, without it, the class will not know the properties names because it will be not created in javascript on the transpilation
    public name: string = null;
    public surname: string = null;

    // the target must receive the @AttributeAdapter decorator, receiving your class as argument 
    @AttributeAdapter( StringToDateConverter )
    public birthday: Date = null;

    // here where the conversion happens, the method 'fill' will set a json resource in the class, the 'convert' will call the converters in the class metadata and make the convertion
    public constructor(json: Object) {
        super();
        this.fill(json);
        this.convert();
    }
}
```

Instalation
----
´´´sh
npm install attr-adapter
´´´

License
----

MIT


**Free Software, Hell Yeah!**
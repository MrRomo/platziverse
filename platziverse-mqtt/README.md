#platziverse-mqtt

## `agent/connected`
``` js
{
    agent: {
        uuid, //autogenerado
        username, //definido por configuracion
        name, //definido por configuracion
        hostname, // obtener del sistema operativo
        pid     //obtener del proceso
    }
}
```
## `agent/disconnected`
``` js
{
    agent: {
        uuid, //autogenerado
    }
}
```
## `agent/message`

``` js
{
    agent,
    metrics: [
        {
            type,
            value
        }
    ],
    timestamp //se genera cuando creamos el mensaje
}
```
/*global Ultraviolet*/
self.__uv$config = {
    prefix: '/network/',
    bare: '/acesspoint/',
    encodeUrl: Ultraviolet.codec.xor.encode,
    decodeUrl: Ultraviolet.codec.xor.decode,
    handler: '/build/handler.js',
    client: '/build/client.js',
    bundle: '/build/bundle.js',
    config: '/build/config.js',
    sw: '/build/sw.js',
};

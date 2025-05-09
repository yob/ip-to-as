# ip-to-as

Lookup the Autonomous System that an IPv4/IPv6 belongs to and print the details.

## IPv6
```
$ tsm src/ip-to-as.ts 2404:6800:400a:804::200e
IP: 2404:6800:400a:804::200e
AS: 15169
country:  US 
registry:  arin 
date:  2000-03-30 
name:  GOOGLE, US
potaroo: http://bgp.potaroo.net/cgi-bin/as-report?as=AS15169&view=2.0
```

## IPv4
```
$ tsm src/ip-to-as.ts 1.1.1.1
IP: 1.1.1.1
AS: 13335
country:  US 
registry:  arin 
date:  2010-07-14 
name:  CLOUDFLARENET, US
potaroo: http://bgp.potaroo.net/cgi-bin/as-report?as=AS13335&view=2.0
```

## Using npm

This is also supported:
```
$ npm run lookup 4.4.4.4

> ip-to-as@1.0.0 lookup
> tsm src/ip-to-as.ts 4.4.4.4

IP: 4.4.4.4
AS: 3356
country:  US 
registry:  arin 
date:  2000-03-10 
name:  LEVEL3, US
potaroo: http://bgp.potaroo.net/cgi-bin/as-report?as=AS3356&view=2.0
```

This is a port of [an old ruby script I've used for years](https://github.com/yob/dotfiles/blob/main/bin/ip-to-as), mainly so I can practice javascript.

#!/usr/bin/env node

import ipaddr from 'ipaddr.js'; // https://www.npmjs.com/package/ipaddr.js
import ipPtr from 'ip-ptr'; // https://www.npmjs.com/package/ip-ptr
import dns from 'node:dns';

const usage = "ip-to-as.ts <ipv4/ipv6>";

function log(message: string): void {
  console.log(message);
}

function getTxt(hostname: string): Promise<string> {
  return new Promise((resolve, reject) => {
    dns.resolveTxt(hostname, (err, hostnames) => {
      if (err != null) {
        reject(new Error("unable to resolve '" + hostname + "'"));
        return;
      }
      resolve(hostnames.join("\n"));
    });
  });
}

const args = process.argv.slice(2);

if (args.length == 0) {
  log(usage);
  process.exit(1);
}

var ip: (ipaddr.IPv4 | ipaddr.IPv6);

try {
  var ip = ipaddr.parse(args[0]);
} catch {
  log("unable to parse IP address");
  process.exit(1);
}

var as_number: (string | null) = null;
var asRegex = /^(\d+).*/;

if (ip.kind() === "ipv4") {
  var reverseHostname: (string) = ipPtr(ip.toString());
  reverseHostname = reverseHostname.replace("in-addr.arpa", "origin.asn.cymru.com")
  var data = await getTxt(reverseHostname);
  var res = asRegex.exec(data);
  if (res != null) {
    as_number = res[1];
  }
} else if (ip.kind() === "ipv6") {
  var reverseHostname: (string) = ipPtr(ip.toString());
  reverseHostname = reverseHostname.replace("ip6.arpa", "origin6.asn.cymru.com")
  var data = await getTxt(reverseHostname);
  var res = asRegex.exec(data);
  if (res != null) {
    as_number = res[1];
  }
} else {
  log(usage);
  process.exit(1);
}

if (as_number != null) {
  log("IP: " + ip.toString());
  log("AS: " + as_number);

  var resNext = await getTxt("AS" + as_number + ".asn.cymru.com")
  var [as, country, registry, date, name] = resNext.split("|")
  log("country: " + country)
  log("registry: " + registry)
  log("date: " + date)
  log("name: " + name)
  log("potaroo: http://bgp.potaroo.net/cgi-bin/as-report?as=AS" + as_number + "&view=2.0")
} else {
  log("no result");
  process.exit(1)
}

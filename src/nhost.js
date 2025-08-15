import { NhostClient } from '@nhost/nhost-js';

const nhost = new NhostClient({
  subdomain: '<cafykseyggvarwpdydnb>',
  region: '<ap-south-1>',   // <-- Replace with your actual region
});

export { nhost };
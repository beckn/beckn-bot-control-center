export const TRIGGER_BLIZZARD_MESSAGE = "Hey, Triggering a Blizzard";
export const CANCEL_BOOKING_MESSAGE = `Dear Guest,\n\nApologies, but your hotel booking with us has been canceled due to unforeseen circumstances. \nWe understand the inconvenience and are here to assist you with any alternative arrangements needed. \n\nPlease contact us for further assistance.`;
export const BASE_URL_PROD = "http://13.201.62.138:3001";
export const BASE_URL_LOCAL = "http://localhost:3009";
export const TOURISM_STRAPI_URL =
  "https://mit-bpp-tourism.becknprotocol.io/api";
export const HOTEL_STRAPI_URL = "https://mit-bpp-hotel.becknprotocol.io/api";
export const ENERGY_STRAPI_URL = "https://mit-bpp-energy.becknprotocol.io/api";
export const RETAIL_STRAPI_URL = "https://mit-bpp-retail.becknprotocol.io/api";
export const STRAPI_TOURISM_TOKEN =
  "82ed7f48afbd0c0605ef36bf4b81259f90c7e6bc357db032a011b1c0ab2bc7db2a753fa84c959f403b256ee66b44174dcc453bd0a40797ce8c22c1b6dab7f416cf3b8a247c19144bc3d019f229612f36b12612223b35f28a1a7fec6ff779228730b45fd93a793399d8f462ba0bada15077725a843d3023cf133838876da3547e";
export const STRAPI_RETAIL_TOKEN =
  "da645bebb6000e23899fc0033c43b5242abd8f5c42c357c52445b531c0b6e88e05a1514efdf97d3eb74083f4c3917990a65f55bcef4935a68a09a6d8efdefadc4c2223766120d0c70156f3a274812238b95d55ec89b44719a1cad71fac92349e9e40007950cd9c23801661093d942810c386e869633fdcd81625fd58d714d688";
export const STRAPI_ENERGY_TOKEN =
  "b0d90319a8dbb6fa9f3319a839bc45093e9db68a5565b01482c0320d4c34ac8651c6145e3fea12448ede8186fe0d5d5e017d6c34f5596005a7413f8f4bbc8ecc2921c6f9ccb498016457d6802ff0585bb4d34e2c315d028f406591f69e91b88891e9984f01035053b49e3c4b48b7216235dbba5713dea74bb3861d9f6829643a";
export const STRAPI_HOTEL_TOKEN =
  "dee1781253b371f2a2897250d7083dbd9d1222bc83bb3c079916a0ed68db08eb3ae63721cdd08b30f37ab0733d03f93228524679169e4dfa4c2e8d2080649fd4ce65574c0e898520ab39fe996d24ce2d69a904ff4fc49fd8ed3bc51e239cbc825a225b5dcb7f0d8241b60826879d1b9ffeb82a5311f4c6a7b6c5394084d3bbe3";
export const STATUS_CODE = {
  retail: ["order-picked-up", "order-on-the-way", "order-delivered"],
  tourism: ["ticket-issued", "ticket-validated"],
  energy: ["charging-started", "charging-stopped", "charger-not-working", "charging-completed"],
  hotel: ["checked-in", "checked-out"]
};

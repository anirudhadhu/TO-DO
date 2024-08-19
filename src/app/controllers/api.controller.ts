import { Context, Get, HttpResponseOK } from "@foal/core";

export class ApiController {
  @Get("/")
  index(ctx: Context) {
    return new HttpResponseOK("Hello world!");
  }
}

// import { Get, HttpResponseOK, UserRequired } from '@foal/core';

// // @JWTRequired({

// // })
// @UserRequired()
// export class ApiController {
//   @Get('/products')
//   readProducts() {
//     return new HttpResponseOK([]);
//   }
// }

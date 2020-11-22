import { Injectable } from '@nestjs/common';

@Injectable()
export class SharedService {
  public parserCookie: (cookie: string) => Record<string, string> = (
    cookie,
  ) => {
    if (typeof cookie === 'string') {
      return cookie
        .split(';')
        .map((value) => value.split('='))
        .reduce((acc, value) => {
          return {
            ...acc,
            [decodeURIComponent(value[0]).trim()]: decodeURIComponent(value[1]),
          };
        }, {});
    }
    return null;
  };
}

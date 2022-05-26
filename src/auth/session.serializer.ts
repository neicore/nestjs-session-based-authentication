import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: (err: Error, user: any) => void): any {
    done(null, user); // Here is where you save the stuff you want to save in the session. right now, i am saving the whole user object without password ofcourse
  }

  deserializeUser(
    payload: any,
    done: (err: Error, payload: string) => void,
  ): void {
    done(null, payload);
  }
}

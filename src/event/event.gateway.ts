import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayDisconnect,
  OnGatewayConnection,
} from '@nestjs/websockets';
import firebaseService from 'src/util/firebase';
import useUserSession from 'src/util/session';

@WebSocketGateway({ cors: '*' })
export class EventGateway implements OnGatewayConnection, OnGatewayDisconnect {
  socketID?: string = '';

  async handleDisconnect(client: any) {
    const userKey = useUserSession.removeSocketId(this.socketID);

    if (userKey && useUserSession.getUserByUid(userKey)?.length == 0) {
      console.log(userKey);
      await firebaseService.setWorking(userKey, false);
    }
  }

  handleConnection(client: any, ...args: any[]) {
    this.socketID = client.id;
  }

  @SubscribeMessage('sendUid')
  async send(@MessageBody() userId: string) {
    const data: any = await firebaseService.get(userId);
    if (data && data?.uid == userId) {
      useUserSession.addUser(userId, this.socketID);

      await firebaseService.setWorking(userId, true);
    }
  }
}

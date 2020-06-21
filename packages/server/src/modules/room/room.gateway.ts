import { Logger, UseInterceptors } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import { JoinRoomEnvelope, RoomEvent } from '@codenames/domain';

import { AuthenticatedSocket } from '~/modules/shared/socket/authenticatedSocket.interface';
import { RedisPropagatorInterceptor } from '~/modules/shared/redisPropagator/redisPropagator.interceptor';

import { RoomService } from './room.service';

@UseInterceptors(RedisPropagatorInterceptor)
@WebSocketGateway({ serveClient: false })
export class RoomGateway {
  @WebSocketServer()
  private server: Server;
  private logger = new Logger(RoomGateway.name);

  constructor(private readonly roomService: RoomService) {}

  @SubscribeMessage(RoomEvent.JoinRoom)
  async onJoinRoom(
    @ConnectedSocket() socket: AuthenticatedSocket,
    @MessageBody() { roomId, username }: JoinRoomEnvelope
  ): Promise<void> {
    this.logger.log(`userHash: ${JSON.stringify(socket.auth)}`);
    // this.server.to(userHash).emit(RoomEvent.RoomJoined, roomId);
    // this.server.to(roomHash).emit(RoomEvent.UserJoined, username);
  }
}

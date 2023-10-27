import { Injectable } from '@angular/core';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { TRPCRouter } from '../../../../backend/src/router';
import { ITodo } from '../../../../lib';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TRPCService {
  private client = createTRPCProxyClient<TRPCRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:8080/todo',
        async headers() {
          // Retrieve the JWT token from AWS Cognito
          // const currentSession = await Auth.currentSession();
          // const jwtToken = currentSession.getIdToken().getJwtToken();
          const jwtToken = '123456789';
          // Set the Authorization header with the JWT token
          return {
            Authorization: `Bearer ${jwtToken}`,
          };
        },
      }),
    ],
  });

  constructor() {}

  public getTodos() {
    return from(this.client.listTodo.query());
  }
  public addTodo(todo: ITodo) {
    return from(this.client.addTodo.mutate(todo));
  }

  public updateTodo(todo: ITodo) {
    return from(this.client.updateTodo.mutate(todo));
  }

  public deleteTodo(todoId: string) {
    return from(this.client.deleteTodo.mutate(todoId));
  }
}

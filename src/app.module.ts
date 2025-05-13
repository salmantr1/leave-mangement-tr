import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LeaveModule } from './leave/leave.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://salman:Tr%40123456@cluster0.yez2ede.mongodb.net/leave-management?retryWrites=true&w=majority&appName=Cluster0',
    ),
    AuthModule,
    UsersModule,
    LeaveModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

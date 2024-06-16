import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { LogInController, SignUpController, ListAllUsers } from './user.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import helmet from 'helmet';
import { NextFunction } from 'express';

@Module({
  imports: [
	PassportModule,
	JwtModule.register({
		secret: `${process.env.JWT_SECRET}`,
		signOptions: { expiresIn: '3h' },
	}),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
	MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	MongooseModule.forRoot(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, {
		dbName: process.env.MONGODB_DB,
		auth: {
		  username: process.env.MONGO_USERNAME,
		  password: process.env.MONGO_PASSWORD,
		},
	  }),
  ],
  controllers: [AppController, LogInController,SignUpController,ListAllUsers],
  providers: [AppService,UserService],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	  consumer
		.apply(
		  helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' }),
		  (req : Request, res : Response, next : NextFunction) => {
			// res.headers.set('Access-Control-Allow-Origin', '*');
			// res.headers.set('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS');
			// res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization');
			next();
		  },
		)
		.forRoutes('*');
	}
}
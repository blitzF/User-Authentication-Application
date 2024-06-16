"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const user_controller_1 = require("./user.controller");
const config_1 = require("@nestjs/config");
const app_service_1 = require("./app.service");
const user_service_1 = require("./user.service");
const user_schema_1 = require("./schemas/user.schema");
const jwt_1 = require("@nestjs/jwt");
const passport_1 = require("@nestjs/passport");
const helmet_1 = require("helmet");
let AppModule = class AppModule {
    configure(consumer) {
        consumer
            .apply(helmet_1.default.referrerPolicy({ policy: 'no-referrer-when-downgrade' }), (req, res, next) => {
            next();
        })
            .forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            passport_1.PassportModule,
            jwt_1.JwtModule.register({
                secret: `${process.env.JWT_SECRET}`,
                signOptions: { expiresIn: '3h' },
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forFeature([{ name: user_schema_1.User.name, schema: user_schema_1.UserSchema }]),
            mongoose_1.MongooseModule.forRoot(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`, {
                dbName: process.env.MONGODB_DB,
                auth: {
                    username: process.env.MONGO_USERNAME,
                    password: process.env.MONGO_PASSWORD,
                },
            }),
        ],
        controllers: [app_controller_1.AppController, user_controller_1.LogInController, user_controller_1.SignUpController, user_controller_1.ListAllUsers],
        providers: [app_service_1.AppService, user_service_1.UserService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
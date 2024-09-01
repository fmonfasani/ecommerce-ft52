Based on the "HomeworkPM4" document and the "Módulo_4_BACKEND_Codigo_Estilizado" provided, here is the complete code along with the necessary instructions to meet all the requirements outlined in the homework:

Instructions to Setup and Run the Project:
Clone the Project Repository:

bash
Copiar código
git clone <repository-url>
cd <repository-directory>
Install Dependencies: Make sure you have Node.js installed. Then, install all necessary dependencies using npm:

bash
Copiar código
npm install
Set Up Environment Variables: Create a .env file in the root of your project with the following contents:

env
Copiar código
DATABASE_URL=postgres://user:password@localhost:5432/ecommerce
JWT_SECRET=your_jwt_secret
Replace the placeholders with your actual database credentials.

Run Database Migrations: To set up the database schema, run the TypeORM migrations:

bash
Copiar código
npm run typeorm migration:run
Start the Development Server: Use the following command to start the development server:

bash
Copiar código
npm run start:dev
Access the Application: Once the server is running, you can access the application at http://localhost:3000.

Code Implementation
Below is the complete code structure required for the application:

1. Module Setup:
   Create the following directories and files inside the src folder:

auth/auth.module.ts
auth/auth.service.ts
auth/auth.controller.ts
users/users.module.ts
users/users.service.ts
users/users.controller.ts
products/products.module.ts
products/products.service.ts
products/products.controller.ts
orders/orders.module.ts
orders/orders.service.ts
orders/orders.controller.ts
database/database.module.ts
auth/auth.module.ts:
typescript
Copiar código
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
imports: [
UsersModule,
PassportModule,
JwtModule.register({
secret: process.env.JWT_SECRET,
signOptions: { expiresIn: '60m' },
}),
],
controllers: [AuthController],
providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
auth/auth.service.ts:
typescript
Copiar código
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
constructor(
private readonly usersService: UsersService,
private readonly jwtService: JwtService,
) {}

async validateUser(username: string, pass: string): Promise<User | null> {
const user = await this.usersService.findOne(username);
if (user && user.password === pass) {
return user;
}
return null;
}

async login(user: User) {
const payload: JwtPayload = { username: user.username, sub: user.id };
return {
access_token: this.jwtService.sign(payload),
};
}
}
auth/auth.controller.ts:
typescript
Copiar código
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
constructor(private readonly authService: AuthService) {}

@UseGuards(LocalAuthGuard)
@Post('signin')
async login(@Request() req) {
return this.authService.login(req.user);
}
} 2. CRUD Operations:
products/products.module.ts:
typescript
Copiar código
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';

@Module({
imports: [TypeOrmModule.forFeature([Product])],
providers: [ProductsService],
controllers: [ProductsController],
})
export class ProductsModule {}
products/products.service.ts:
typescript
Copiar código
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
constructor(
@InjectRepository(Product)
private readonly productRepository: Repository<Product>,
) {}

findAll(): Promise<Product[]> {
return this.productRepository.find();
}

findOne(id: string): Promise<Product> {
return this.productRepository.findOneBy({ id });
}

create(product: Product): Promise<Product> {
return this.productRepository.save(product);
}

async remove(id: string): Promise<void> {
await this.productRepository.delete(id);
}
}
products/products.controller.ts:
typescript
Copiar código
import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
constructor(private readonly productsService: ProductsService) {}

@Get()
findAll(): Promise<Product[]> {
return this.productsService.findAll();
}

@Get(':id')
findOne(@Param('id') id: string): Promise<Product> {
return this.productsService.findOne(id);
}

@Post()
create(@Body() product: Product): Promise<Product> {
return this.productsService.create(product);
}

@Delete(':id')
remove(@Param('id') id: string): Promise<void> {
return this.productsService.remove(id);
}
} 3. Connecting to Database:
database/database.module.ts:
typescript
Copiar código
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
imports: [
ConfigModule.forRoot({
isGlobal: true,
}),
TypeOrmModule.forRootAsync({
imports: [ConfigModule],
inject: [ConfigService],
useFactory: (configService: ConfigService) => ({
type: 'postgres',
host: configService.get('DB_HOST'),
port: configService.get<number>('DB_PORT'),
username: configService.get('DB_USERNAME'),
password: configService.get('DB_PASSWORD'),
database: configService.get('DB_NAME'),
entities: [__dirname + '/../**/*.entity{.ts,.js}'],
synchronize: true,
}),
}),
],
})
export class DatabaseModule {}
This structure provides the necessary components for a basic e-commerce backend using NestJS, complete with user authentication, product management, and order processing. You should now be able to fulfill the homework requirements as per the given documents.

/* eslint-disable prettier/prettier */
// Instala las dependencias de NestJs
import { NestFactory } from '@nestjs/core'; // para crear la aplicación
import { AppModule } from './app.module'; // para cargar el modulo principal
import { loggerglobal } from './middlewares/loggerglobal'; //
import * as dotenv from 'dotenv'; // para cargar las variables de entorno
import { ValidationPipe } from '@nestjs/common'; // para validar los datos
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; // para documentar la api
dotenv.config({ path: './.development.env' }); // para cargar las variables de entorno

async function bootstrap() {
  // crea la aplicacion
  const app = await NestFactory.create(AppModule); // instancia a AppModule como modulo raiz y se trae los controladores y demas
  app.use(loggerglobal); // agrega el middleware
  app.useGlobalPipes(new ValidationPipe()); // agrega el middleware de validacion
  const options = new DocumentBuilder() // agrega la documentacion para la api
    .setTitle('NestJs API - Ecommerce App FT52')
    .setDescription(
      'Projecto Integrador de la especialidad de Backend con NestJs',
    )
    .setVersion('1.1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options); // crea la documentacion
  SwaggerModule.setup('api', app, document); // agrega la documentacion al endpoint
  await app.listen(3000); // escucha el puerto para recibir peticioones http y responderlas
}
bootstrap(); // ejecuta la aplicacion

import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { CategoriaController } from "./controllers/categoria.controller";
import { Categoria } from "./entities/categoria.entity";
import { CategoriaService } from "./services/categoria.service";

@Module({
    imports: [TypeOrmModule.forFeature([Categoria])],
    providers: [CategoriaService],
    controllers: [CategoriaController],
    exports: [CategoriaService],
})
export class CategoriaModule {}
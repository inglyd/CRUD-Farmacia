import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { Categoria } from './../entities/categoria.entity';
import { CategoriaService } from '../services/categoria.service';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }
  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
    return this.categoriaService.findById(id);
  }
  
  @Get(':id/produtos')
listarProdutos(@Param('id', ParseIntPipe) id: number) {
  return this.categoriaService.listarProdutos(id);
}


  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.create(categoria);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() categoria: Categoria): Promise<Categoria> {
    return this.categoriaService.update(categoria);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.categoriaService.delete(id);
  }

    // Adicionar um produto à categoria
    @Patch(':id/adicionar-produto')
    adicionarProduto(
      @Param('id', ParseIntPipe) id: number,
      @Body('produtoId') produtoId: number,
    ) {
      return this.categoriaService.adicionarProduto(id, produtoId);
    }
  
     // Contar produtos de uma categoria
  @Get(':id/quantidade-produtos')
  contarProdutos(@Param('id', ParseIntPipe) id: number) {
    return this.categoriaService.contarProdutos(id);
  }
}


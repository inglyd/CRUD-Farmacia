import { Body, Controller, Delete, Get, HttpCode, HttpStatus, NotFoundException, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { Produto } from './../entities/produto.entity';
import { ProdutoService } from '../services/produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }
  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id', ParseIntPipe) id: number): Promise<Produto> {
    return this.produtoService.findById(id);
  }
  
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findAllBydescricao(@Param('nome') descricao: string): Promise<Produto[]> {
    return this.produtoService.findByNome(descricao);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id', ParseIntPipe) id: number){
    return this.produtoService.delete(id);
  }

  @Patch(':id/categoria')
alterarCategoria(
  @Param('id', ParseIntPipe) id: number,
  @Body('categoriaId') categoriaId: number,
) {
  return this.produtoService.alterarCategoria(id, categoriaId);
}

@Patch(':id/desconto')
aplicarDesconto(
  @Param('id', ParseIntPipe) id: number,
  @Body('percentual') percentual: number,
) {
  return this.produtoService.aplicarDesconto(id, percentual);
}

  
}

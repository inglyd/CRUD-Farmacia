import { CategoriaService } from './../../categoria/services/categoria.service';
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService
  ) { }
  
  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: {
        categoria: true
      }   
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true
      }
    });

    if (!produto) {
      throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND);
    } 
    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: {
        categoria: true
      }
    });
  }

  async create(produto: Produto): Promise<Produto> {
    if (produto.categoria && produto.categoria.id) {
      await this.categoriaService.findById(produto.categoria.id);
    }
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    await this.findById(produto.id);
    if (produto.categoria && produto.categoria.id) {
      await this.categoriaService.findById(produto.categoria.id);
    }
    return this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.produtoRepository.delete(id);
  }

  async alterarCategoria(produtoId: number, categoriaId: number) {
    const produto = await this.findById(produtoId);
    const categoria = await this.categoriaService.findById(categoriaId);
    
    produto.categoria = categoria;
    return this.produtoRepository.save(produto);
  }

  async aplicarDesconto(produtoId: number, percentual: number) {
    const produto = await this.findById(produtoId);
    
    if (percentual < 0 || percentual > 100) {
      throw new HttpException('Percentual inválido. Deve estar entre 0 e 100', HttpStatus.BAD_REQUEST);
    }
    
    produto.preco = Number((produto.preco * (1 - percentual / 100)).toFixed(2));
    return this.produtoRepository.save(produto);
  }
}
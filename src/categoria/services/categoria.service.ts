import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";


@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}
 
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produto: true
      }
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: {
        produto: true
      }
    });

    if (!categoria)
      throw new HttpException('Categoria não encontrada!', HttpStatus.NOT_FOUND);

    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: {
        produto: true
      }
    });
  }

  async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    await this.findById(categoria.id);
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number) {
    await this.findById(id);
    return this.categoriaRepository.delete(id);
  }

  // Listar todos os produtos de uma categoria
  async listarProdutos(categoriaId: number) {
    const categoria = await this.findById(categoriaId);
    return categoria.produto;
  }

  // Contar produtos de uma categoria
  async contarProdutos(categoriaId: number): Promise<{ quantidade: number }> {
    const categoria = await this.findById(categoriaId);
    return { quantidade: categoria.produto.length };
  }
}
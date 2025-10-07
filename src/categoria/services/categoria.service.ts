import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ILike, Repository } from "typeorm";
import { Categoria } from "../entities/categoria.entity";


@Injectable()
export class CategoriaService {
      [x: string]: any;
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
          where: {
              id
          },
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
    
   
      // Adicionar um produto existente à categoria
      async adicionarProduto(categoriaId: number, produtoId: number) {
        const categoria = await this.categoriaRepository.findOne({
          where: { id: categoriaId },
          relations: ['produtos'],
        });
    
        const produto = await this.produtoRepository.findOne({ where: { id: produtoId } });
    
        if (!categoria || !produto) return null;
    
        categoria.produto.push(produto);
        return this.categoriaRepository.save(categoria);
      }
    
      // Listar todos os produtos de uma categoria
      async listarProdutos(categoriaId: number) {
        const categoria = await this.categoriaRepository.findOne({
          where: { id: categoriaId },
          relations: ['produtos'],
        });
    
        if (!categoria) return null;
    
        return categoria.produto;
      }


}
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) { }

  async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const post = await this.postRepository.create({
      title: createPostDto.title,
      content: createPostDto.content,
    });

    return this.postRepository.save(post);
  }

  async getAllPosts(): Promise<Post[]> {
    return await this.postRepository.find();
  }

  async getPostById(id: number): Promise<Post> {
    return await this.postRepository.findOneByOrFail({
      id: id,
    });
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    const post = await this.getPostById(id);

    if (!post) {
      throw new Error(`There is no post with id:${id}`);
    }

    post.title = updatePostDto.title;
    post.content = updatePostDto.content;

    return this.postRepository.save(post);
  }

  async deletPost(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) { }

  @Mutation(() => Post, { description: 'Create new post' })
  createPost(@Args('createPostDto') createPostDto: CreatePostDto) {
    return this.postsService.createPost(createPostDto);
  }

  @Query(() => [Post], { name: 'posts', description: 'Get all posts' })
  getAllPosts() {
    return this.postsService.getAllPosts();
  }

  @Query(() => Post, { name: 'post', description: 'Get single post' })
  getPostById(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.getPostById(id);
  }

  @Mutation(() => Post, { description: 'Update post' })
  updatePost(@Args('updatePostDto') updatePostDto: UpdatePostDto) {
    return this.postsService.updatePost(updatePostDto.id, updatePostDto);
  }

  @Mutation(() => Post, { description: 'Delete post' })
  deletePost(@Args('id', { type: () => Int }) id: number) {
    return this.postsService.deletPost(id);
  }
}

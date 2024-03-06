import {
  type ObjectLiteral,
  type Repository,
  type SelectQueryBuilder,
} from "typeorm";

export interface PaginationOptions {
  page: number;
  perPage: number;
}
export interface PaginationResponse<T> {
  data: T[];
  meta: {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
  };
}

export class Pagination<T extends ObjectLiteral> {
  constructor(
    private readonly repository: Repository<T>,
    private readonly queryBuilder: SelectQueryBuilder<T>,
    private readonly options: PaginationOptions,
  ) {}

  async paginate(): Promise<PaginationResponse<T>> {
    const { page, perPage } = this.options;

    const [data, totalItems] = await this.queryBuilder
      .take(perPage)
      .skip((page - 1) * perPage)
      .getManyAndCount();

    const totalPages = Math.ceil(totalItems / perPage);

    return {
      data,
      meta: {
        totalItems,
        itemCount: data.length,
        itemsPerPage: perPage,
        totalPages,
        currentPage: page,
      },
    };
  }
}

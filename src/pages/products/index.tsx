import { InferGetStaticPropsType } from 'next'
import styled from '@emotion/styled'
import { dehydrate } from '@tanstack/react-query'

import { NextPageWithLayout } from '@/types/app'
import { productKey } from '@/services/reactQuery/product/key'
import { getProducts } from '@/services/axios/product'
import CategoryChips from '@/features/products/Category'
import { getLayout } from '@/components/layouts/Layout'
import ProductList, {
  PRODUCTS_DEFAULT_COUNT,
} from '@/features/products/ProductList'
import Search from '@/features/products/Search'
import FillterProvider from '@/features/products/context/fillterProvider'
import { queryClient } from '@/services/reactQuery/queryClient'

export async function getStaticProps() {
  await queryClient.prefetchInfiniteQuery(
    productKey.list({ limit: PRODUCTS_DEFAULT_COUNT, skip: 0 }),
    ({ queryKey }) => getProducts(queryKey[0])
  )

  return {
    props: {
      title: '상품 리스트',
      description: '상품 리스트',
      /**
       * @description
       * prefetchInfiniteQuery에서 pageParams에 첫번째 인자가 null이라 seralize 에러가 발생한다.
       */
      dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
    },
  }
}

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <>
      <Wrapper>
        <FillterProvider>
          <Search />
          <CategoryChips />
          <ProductList />
        </FillterProvider>
      </Wrapper>
    </>
  )
}

HomePage.getLayout = getLayout

export default HomePage

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 50px;
`

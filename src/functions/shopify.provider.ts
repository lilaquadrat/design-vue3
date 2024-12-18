export default class ShopifyGraphQLAPI {

  private shop: string;
  private accessToken: string;
  private apiVersion: string;

  productCache: Record<string, any> = {};

  constructor (shop: string, accessToken: string, apiVersion: string = '2024-04') {
    this.shop = shop;
    this.accessToken = accessToken;
    this.apiVersion = apiVersion;
  }

  private async makeGraphQLRequest (query: string, variables?: object): Promise<any> {

    const url = `https://${this.shop}/api/${this.apiVersion}/graphql.json`;
    const headers = {
      'X-Shopify-Storefront-Access-Token': this.accessToken,
      'Content-Type'                     : 'application/json',
    };
    const body = JSON.stringify({ query, variables });
    const response = await fetch(url, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error(`GraphQL Error: ${response.statusText}`);
    }

    const result = await response.json();

    if (result.errors) {
      throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  }

  // Fetch a product by ID
  public async getProduct (productId: string): Promise<any> {

    if(this.productCache[productId]) return Promise.resolve(this.productCache[productId]);

    const query = `
            query GetProduct($id: ID!) {
                product(id: $id) {
                    id
                    title
                    description
                    variants(first: 10) {
                        edges {
                            node {
                                id
                                title
                                price {
                                    amount
                                    currencyCode
                                }
                            }
                        }
                    }
                    images(first: 1) {
                        edges {
                            node {
                                id
                                src: url
                                altText
                            }
                        }
                    }
                }
            }
        `;
    const variables = { id: `gid://shopify/Product/${productId}` };
    const product = await this.makeGraphQLRequest(query, variables);

    console.log(product);

    // const cleanedProduct = this.transformProduct(product);
    const cleanedProduct = {
      name       : product.product.title,
      id         : product.product.id,
      variantId  : product.product.variants.edges[0].node.id,
      price      : product.product.variants.edges[0].node.price.amount,
      description: product.product.description
    }

    if(product.product.images.edges[0]) {
        
      cleanedProduct.image = product.product.images.edges[0].node.src;
        
    }

    this.productCache[productId] = cleanedProduct; 

    return cleanedProduct;

  }

  // Create an empty cart
  public async getCart (attributes: {key: string, value: string}[]): Promise<any> {
    const mutation = `
        mutation CreateEmptyCart($attributes: [AttributeInput!]) {
            cartCreate(input: { attributes: $attributes }) {
                cart {
                    id
                    checkoutUrl
                    attributes {
                        key
                        value
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    const cart = await this.makeGraphQLRequest(mutation, {attributes});

    return cart.cartCreate.cart;
  }

  // Get a cart by ID
  public async getCartWithProducts (cartId: string): Promise<any> {
    const query = `
            query GetCart($cartId: ID!) {
                cart(id: $cartId) {
                    id
                    checkoutUrl
                    attributes {
                        key
                        value
                    }
                    lines(first: 50) {
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                        product {
                                            id
                                            title
                                            description
                                            images(first: 1) {
                                              edges {
                                                  node {
                                                      id
                                                      src: url
                                                      altText
                                                  }
                                              }
                                            }
                                        }
                                        price {
                                            amount
                                            currencyCode
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        `;
    const variables = { cartId };
    const cart = await this.makeGraphQLRequest(query, variables);

    if(!cart.cart) {
      console.log('no cart');
      throw new Error('CART_NOT_FOUND');
    }

    return this.transformProducts(cart.cart.lines.edges);

  }

  public async addToCart (cartId: string, product: any, quantity: number): Promise<any> {
    const mutation = `
        mutation AddProductToCart($cartId: ID!, $lines: [CartLineInput!]!) {
            cartLinesAdd(cartId: $cartId, lines: $lines) {
                cart {
                    id
                    checkoutUrl
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                    }
                                }
                            }
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    const variables = {
      cartId,
      lines: [
        {
          merchandiseId: product.variantId,
          quantity,
        },
      ],
    };
    const cartLinesAdd = await this.makeGraphQLRequest(mutation, variables);

    return cartLinesAdd.cartLinesAdd.cart.lines.edges[0].node.id;
  }

  // Remove product from the cart
  public async removeFromCart (cartId: string, cartProduct: any): Promise<any> {
    const mutation = `
          mutation RemoveCartLine($cartId: ID!, $lineIds: [ID!]!) {
              cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
                  cart {
                      id
                      checkoutUrl
                      lines(first: 10) {
                          edges {
                              node {
                                  id
                                  quantity
                                  merchandise {
                                      ... on ProductVariant {
                                          id
                                          title
                                      }
                                  }
                              }
                          }
                      }
                  }
                  userErrors {
                      field
                      message
                  }
              }
          }
      `;
    const variables = {
      cartId,
      lineIds: [cartProduct.lineId], // List of line IDs to remove
    };

    return this.makeGraphQLRequest(mutation, variables);
  }

  public async updateQuantity (cartId: string, cartProduct: any, quantity: number): Promise<any> {
    const mutation = `
        mutation UpdateCartLineQuantity($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
            cartLinesUpdate(cartId: $cartId, lines: $lines) {
                cart {
                    id
                    checkoutUrl
                    lines(first: 10) {
                        edges {
                            node {
                                id
                                quantity
                                merchandise {
                                    ... on ProductVariant {
                                        id
                                        title
                                    }
                                }
                            }
                        }
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    const variables = {
      cartId,
      lines: [
        {
          id: cartProduct.lineId, // The line item ID to update
          quantity,
        },
      ],
    };

    return this.makeGraphQLRequest(mutation, variables);
  }

  public async updateCartAttributes (cartId: string, attributes: { key: string; value: string }[]): Promise<any> {
    const mutation = `
        mutation UpdateCartAttributes($cartId: ID!, $attributes: [AttributeInput!]!) {
            cartAttributesUpdate(cartId: $cartId, attributes: $attributes) {
                cart {
                    id
                    checkoutUrl
                    attributes {
                        key
                        value
                    }
                }
                userErrors {
                    field
                    message
                }
            }
        }
    `;
    const variables = { cartId, attributes };

    console.log(variables);

    const cart = await this.makeGraphQLRequest(mutation, variables);

    if (cart.cartAttributesUpdate.userErrors.length > 0) {
      console.error('Errors:', cart.cartAttributesUpdate.userErrors);
      throw new Error('Failed to update cart attributes');
    }

    return cart.cartAttributesUpdate.cart;
  }

  transformProducts (products: any[]) {

    return products.map((edge) => {

      const transformedProduct = {
        lineId     : edge.node.id,
        variantId  : edge.node.merchandise.id,
        quantity   : edge.node.quantity,
        name       : edge.node.merchandise.product.title,
        id         : edge.node.merchandise.product.id,
        description: edge.node.merchandise.product.description,
        price      : edge.node.merchandise.price.amount,
        currency   : edge.node.merchandise.price.currencyCode,
      }
        
      console.log(edge.node);
      
      if(edge.node.merchandise.product.images.edges[0]) {
        
        transformedProduct.image = edge.node.merchandise.product.images.edges[0].node.src;
        
      }
        
      return transformedProduct;

    })

  }
}

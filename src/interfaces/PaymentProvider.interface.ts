export default interface PaymentProvider {

    getCart(attributes?: {key: string, value: string}[]): Promise<{id: string, checkourUrl?: string}>;
    updateCartAttributes(cartId: string, attributes?: {key: string, value: string}[]): Promise<{id: string, checkourUrl?: string}>;
    getCartWithProducts(cartId: string): Promise<any[]>;
    getProduct(productId: string): Promise<any>;
    addToCart(cartId: string, product: any, amount: number): Promise<any>;
    removeFromCart(cartId: string, product: any): Promise<any>;
    updateQuantity(cartId: string, cartProduct: any, amount: number): Promise<any>;

}
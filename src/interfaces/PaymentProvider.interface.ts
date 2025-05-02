export default interface PaymentProvider {

    getCart(attributes?: Record<string, string>): Promise<{id: string, checkourUrl?: string}>;
    updateCartAttributes(cartId: string, attributes?: Record<string, string>): Promise<{id: string, checkourUrl?: string}>;
    getCartWithProducts(cartId: string): Promise<any[]>;
    getProduct(productId: string): Promise<any>;
    addToCart(cartId: string, product: any, amount: number): Promise<any>;
    removeFromCart(cartId: string, product: any): Promise<any>;
    updateQuantity(cartId: string, cartProduct: any, amount: number): Promise<any>;
    finalize(cartId: string): Promise<any>;
    getFinishedCart(cartId: string): Promise<any>;

}
import { removeProduct } from '../../src/controllers/productController';
import { Products } from '../models/productModel';

jest.mock('../../src/models/productModel'); // Mocking the Products model

describe('removeProduct function', () => {
  it('should remove an existing product', async () => {
    const req = { body: { id: 1, name: 'Test Product' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const removedProduct = { id: 1, name: 'Test Product' };
    Products.findOneAndDelete.mockResolvedValue(removedProduct);

    await removeProduct(req, res);

    expect(Products.findOneAndDelete).toHaveBeenCalledWith({ id: 1 });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      message: 'Product removed',
      name: 'Test Product',
    });
  });

  it('should return 404 if product is not found', async () => {
    const req = { body: { id: 1, name: 'Test Product' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    Products.findOneAndDelete.mockResolvedValue(null);

    await removeProduct(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: 'Product not found',
      name: 'Test Product',
    });
  });

  // Add more unit tests for other scenarios...
});

package com.sdp.pos.constant;

import com.sdp.pos.entity.ProductEntity;
import com.sdp.pos.service.product.exception.InsufficientStockException;

public enum AdjustStockProductEnum {
    INCREASE {
        @Override
        public void apply(ProductEntity product, int quantity) {
            product.increaseStock(quantity);
        }
    },
    DECREASE {
        @Override
        public void apply(ProductEntity product, int quantity) {
            if (product.getStockLevel() < quantity) {
                throw new InsufficientStockException(product.getId(), quantity, product.getStockLevel());
            }
            product.decreaseStock(quantity);
        }
    };

    public abstract void apply(ProductEntity product, int quantity);
}

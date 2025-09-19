package com.sdp.pos.constant;

import com.sdp.pos.entity.ProductEntity;

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
            product.decreaseStock(quantity);
        }
    };

    public abstract void apply(ProductEntity product, int quantity);
}

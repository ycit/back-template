package com.ycit.service;

import com.ycit.bean.entity.GoodsSearchForm;
import com.ycit.bean.modal.Goods;
import com.ycit.mapper.GoodsMapper;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

/**
 * 商品 service 层
 *
 * @author xlch
 * @Date 2018-03-22 16:24
 */
@Service
public class GoodsService {

    private GoodsMapper goodsMapper;

    @Resource
    public void setGoodsMapper(GoodsMapper goodsMapper) {
        this.goodsMapper = goodsMapper;
    }

    public List<Goods> finds(GoodsSearchForm searchForm) {
        return goodsMapper.finds(searchForm);
    }
}
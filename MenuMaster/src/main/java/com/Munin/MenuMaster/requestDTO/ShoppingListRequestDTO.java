package com.Munin.MenuMaster.requestDTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ShoppingListRequestDTO {
    private String startDate;
    private String endDate;

}

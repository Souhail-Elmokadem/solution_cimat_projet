package org.sid.stage_prj.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MandatPayload {
    MandatRecieveDTO mandat;
    String photo;
}

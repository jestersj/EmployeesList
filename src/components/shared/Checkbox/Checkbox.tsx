import React, {FC} from 'react';
import s from "./Checkbox.module.scss";

interface Props {
    label: string
    checked: boolean
    onChange?: () => void
}
const Checkbox: FC<Props> = ({label, checked, onChange}) => {
    return (
        <label className={s.cont}>
            <input className={s.checkbox} type={'checkbox'} onChange={onChange} checked={checked}/>
            <span/>
            {label}
        </label>
    );
};

export default Checkbox;
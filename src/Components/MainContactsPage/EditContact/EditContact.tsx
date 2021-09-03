import React, {useEffect} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {PrimaryButton} from "../../assets/Components/From/Button"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "../../assets/Components/From/Input";

import { schema } from './schema/schema';
import {useDispatch, useSelector} from "react-redux";
import {getEditContact, getLoading} from "../../../redux/phoneReducer/phoneSelectors/phoneSelectors";
import {actions, ItemPhoneType} from "../../../redux/phoneReducer/phoneReducer";
import {CancelButton} from "../../assets/Components/From/CanсelButton";
import CircularProgress from "@material-ui/core/CircularProgress";

type PropsType = {
    name: string,
    phone: string,
    onChangeName: (value: string) => void
    onChangePhone: (value: string) => void
    onSubmitForm: (data: ItemPhoneType) => void
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            '& > *': {
                marginLeft: 'auto',
                marginRight: 'auto',
                margin: theme.spacing(1),
                width: '50ch',
            },
        },

    }),
);

export const EditContact: React.FC<PropsType> = ({name, phone, onChangeName, onChangePhone, onSubmitForm}) => {
    const editData = useSelector(getEditContact)
    const loading = useSelector(getLoading)

    const dispatch = useDispatch()
    const classes = useStyles();

    useEffect(() => {
        if (!editData){
            dispatch(actions.clearEditContact())
        }
        onChangeName(editData?.name ?? '')
        onChangePhone(editData?.number ?? '')

    },[editData])

    const onCancelEdit = () => {
        dispatch(actions.clearEditContact())
        onChangeName('')
        onChangePhone('')
    }
    const onSubmit = (data: { name: string, phone: string}) => {
        onSubmitForm({number: data.phone, name: data.name, id: editData?.id ?? 'default'})
        onCancelEdit()
    }

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {name: editData?.name ?? name, phone: editData?.number ?? phone},
        mode: "onBlur",
        resolver: yupResolver(schema)

    })


    return (
        <form className={classes.root}  onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('name')}
                id="name"
                type="text"
                label="Name"
                error={!!errors.name}
                helperText={errors?.name?.message}
                value={name}
                onChange={(e: any) => onChangeName(e.target.value)}
            />
            <Input
                {...register('phone')}
                id="phone"
                type="text"
                label="Phone"
                error={!!errors.phone}
                helperText={errors?.phone?.message}
                value={phone}
                onChange={(e: any) => onChangePhone(e.target.value)}
            />
            <CancelButton
                disabled={loading}
                onClick={onCancelEdit}
            >
                Canсel
            </CancelButton>
            <PrimaryButton
                disabled={loading}
            >
                {loading?  <CircularProgress color="primary" /> : 'Edit contact'}
            </PrimaryButton>
        </form>
    );
}

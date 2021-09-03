import React, {useEffect, useState} from 'react'
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles'
import {PrimaryButton} from "../../assets/Components/From/Button"
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {Input} from "../../assets/Components/From/Input";
import {createContactType} from "../../types/APITypes";
import {schema} from "./shema/schema";
import {useSelector} from "react-redux";
import {getLoading, getSuccess} from "../../../redux/phoneReducer/phoneSelectors/phoneSelectors";
import CircularProgress from "@material-ui/core/CircularProgress";

type PropsType = {
    name: string,
    phone: string,
    onChangeName: (value: string) => void
    onChangePhone: (value: string) => void
    onSubmitForm: (data: createContactType) => void
    onCheckContactList: (name: string) => undefined | any
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

export const Form: React.FC<PropsType> = ({name, phone, onChangeName, onChangePhone, onSubmitForm, onCheckContactList}) => {
    const classes = useStyles();

    const loading = useSelector(getLoading)
    const success = useSelector(getSuccess)
    const [match, setMatch] = useState(false)

    const onSubmit = (data: { name: string, phone: string}) => {
        if (onCheckContactList(name)){
            setMatch(true)
            return
        }
        onSubmitForm({number: data.phone, name: data.name})
    }

    useEffect(()=> {
        if(!success) return
        onChangeName('')
        onChangePhone('')
    },[success])

    const {register, handleSubmit, formState: {errors}} = useForm({
        defaultValues: {name, phone},
        mode: "onBlur",
        resolver: yupResolver(schema)
    })
    const clearMatch = () => {
        if (!match) return
        setMatch(false)
    }

    return (
        <form className={classes.root}  onSubmit={handleSubmit(onSubmit)}>
            <Input
                {...register('name')}
                id="name"
                type="text"
                label="Name"
                error={!!errors.name || match}
                helperText={match ? 'Этот пользователь у вас уже есть' : errors?.name?.message}
                value={name}
                onFocus={clearMatch}

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
            <PrimaryButton
                disabled={loading}
            >
                {loading ? <CircularProgress color="primary" /> :
                    'Add contact'
                }
            </PrimaryButton>
        </form>
    );
}

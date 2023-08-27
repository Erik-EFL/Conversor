import React from "react";
import {Tooltip, Button} from "@nextui-org/react";
import { Download, Delete } from '@mui/icons-material';

interface propsController {
  name: string,
  onClick?: () => void,
  additionalClassName?: string,
  disabled?: boolean,
  type?: any
}

export default function ButtonGeneric({ name, onClick, disabled, type, additionalClassName }: propsController) {

  const replaceName = (name: string) => {
    switch(name) {
      case 'Download' || 'download':
        return (
          <Tooltip content='Faça o Download'>
            <Download type={type} onClick={onClick} className={additionalClassName} />
          </Tooltip>
        )
      case 'Delete' || 'delete':
        return (
          <Tooltip content='Deletar arquivo'>
            <Delete type={type} onClick={onClick} className={`${additionalClassName}`} />
          </Tooltip>
        )
      default:
        return (
          <Button
            onClick={onClick}
            className={`
              bg-transparent
              border-3
              ${additionalClassName}
            `}
            isDisabled={disabled}
            type={type}
          >
            {name}
          </Button>
        )
    }
  }

  return <>{replaceName(name)}</>
}

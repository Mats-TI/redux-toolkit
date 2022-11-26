import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button
  } from '@chakra-ui/react';
  import { Filter } from 'react-feather';

const PopoverComponent = ({ icon }) => {

    return (
        <Popover>
            <PopoverTrigger>
                <Button>
                    { icon? icon : <Filter size={16} /> }
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Confirmation!</PopoverHeader>
                <PopoverBody>Are you sure you want to have that milkshake?</PopoverBody>
            </PopoverContent>
        </Popover>
    );
};

export default PopoverComponent;
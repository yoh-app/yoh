import React, { useEffect, useRef, useCallback, useState, useContext } from 'react';
import { useNode, useEditor } from '@craftjs/core';

// import ArrowUp from '../../../../public/static/icons/craft/arrow-up.svg';
// import Move from '../../../../public/static/icons/craft/move.svg';
// import Delete from '../../../../public/static/icons/craft/delete.svg';
import ReactDOM from 'react-dom';
import { ROOT_NODE } from '@craftjs/utils';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { v4 as uuid } from 'uuid';
import { CraftContext } from './CraftContext';
export const RenderNode = ({ render }) => <>{render}</>;

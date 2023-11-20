import React, { useCallback } from 'react';
import { useDropzone, FileWithPath } from 'react-dropzone'; // 注意：这里导入了 FileWithPath 类型
import styled from 'styled-components';
import styles from "./ui-lib.module.scss";
import DownIcon from "../icons/down.svg";
import LoadingIcon from "../icons/three-dots.svg";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UploadButton = styled.button`

`;


const UploadText = styled.p`
  margin-top: 5px;
  margin-bottom: 0;
  font-size: 11px;
  color: #555;
`;

interface UploadImageComponentProps {
    onUpload: (file: File) => void;
    uploadLoading: boolean;
}

const UploadImageComponent: React.FC<UploadImageComponentProps> = ({ onUpload, uploadLoading }) => {
    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        // Handle the uploaded files
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0];
            // Perform any additional actions with the file (e.g., upload to a server)
            onUpload(file);
        }
    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    const text = isDragActive ? '拖动图片在这里松开' : '点击或拖动图片到这里';
    return (
        <div className={ styles["select-with-icon"]}>
            { uploadLoading && <LoadingIcon style={{ marginRight: "10px" }}/> }
            <select className={
                styles["select-with-icon-select"]
            } {...getRootProps()}  style={{ paddingRight: '10px'}}>
                <input {...getInputProps()} />
                <option value={text} key={text}>
                    {text}
                </option>
            </select>
        </div>

    );
};

export default UploadImageComponent;

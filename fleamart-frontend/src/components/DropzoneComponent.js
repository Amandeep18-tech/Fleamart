import React, { useCallback, useEffect, useMemo } from 'react';
import { useDropzone } from 'react-dropzone';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '2vh',
  borderWidth: 2,
  borderRadius: '10px',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out',
};

const activeStyle = {
  borderColor: '#2196f3',
};

const acceptStyle = {
  borderColor: '#00e676',
};

const rejectStyle = {
  borderColor: '#ff1744',
};

function DropzoneComponent({ files, setFiles }) {
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          url: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png, image/jpg',
  });

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  useEffect(
    () => () => {
      files.forEach((file) => URL.revokeObjectURL(file.url));
    },
    [files]
  );

  return (
    <section style={{ marginTop: '2vh', cursor: 'pointer', width: '100%' }}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div>
          Drag and Drop your images here! or Click Here to open dialog! Max-Size
          10MB
        </div>
      </div>
      <aside
        style={{
          marginTop: '2vh',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2vh',
        }}
      >
        {files.map((file) => (
          <div
            key={file.name}
            style={{
              marginRight: '1vh',
              borderRadius: '10px',
              border: '2px solid blue',
            }}
          >
            <img
              src={file.url}
              alt={file.name}
              width='200vh'
              height='200vh'
              style={{ padding: '1vh' }}
            />
          </div>
        ))}
      </aside>
    </section>
  );
}

export default DropzoneComponent;

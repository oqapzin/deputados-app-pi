import React from 'react'

const Tag = ({ Islabel = "", value = "", info = false, primary = true, blue = false, warning = false, center = false  }) => {
  return (
    <>

      <style type="text/css">
        {`
          .tags:not(:last-child) {
            margin-bottom: 1rem;
        }

        .tag:not(body) {
          align-items: center;
          background-color: #f5f5f5;
          border-radius: 4px;
          color: #4a4a4a;
          display: inline-flex;
          font-size: .88rem;
          height: 2em;
          justify-content: center;
          line-height: 1.5;
          padding-left: 0.75em;
          padding-right: 0.75em;
          white-space: nowrap;
        }

        .is-warning {
          background-color: var(--amarelo) !important;
          color: #fff !important;
        }

        .is-blue {
          background-color: var(--azul-escuro) !important;
          color: #fff !important;
        }

     
  
      `}
      </style>

      <h3 className={`tags has-addons info-text ${center && "text-center"}`}>
        <span className={`tag  ${primary && 'is-primary'} ${info && 'is-info'}`}>
          {Islabel}
        </span>
        <span
          className={`tag  ${blue && 'is-blue'} ${warning && 'is-warning'} `}
        >
          {value ?? 'Não informado'}
        </span>
      </h3>
    </>
  )
}

export default Tag


/*    font-size: 100%;
    font-weight: 400; */
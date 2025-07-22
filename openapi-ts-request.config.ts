import type { GenerateServiceProps } from 'openapi-ts-request'

export default [
  // {
  //   schemaPath: 'http://petstore.swagger.io/v2/swagger.json',
  //   serversPath: './src/service/app',
  //   requestLibPath: `import request from '@/utils/request';\n import { CustomRequestOptions } from '@/interceptors/request';`,
  //   requestOptionsType: 'CustomRequestOptions',
  //   isGenReactQuery: true,
  //   reactQueryMode: 'vue',
  //   isGenJavaScript: false,
  // },
  //npm run openapi-ts-request
  {
    schemaPath: 'http://127.0.0.1:4523/export/openapi/5?version=3.0',
    serversPath: './src/service/app',
    requestLibPath: `import request from '@/utils/request';\n import { CustomRequestOptions } from '@/interceptors/request';`,
    requestOptionsType: 'CustomRequestOptions',
    isGenReactQuery: true,
    reactQueryMode: 'vue',
    isGenJavaScript: false,
  },
] as GenerateServiceProps[]

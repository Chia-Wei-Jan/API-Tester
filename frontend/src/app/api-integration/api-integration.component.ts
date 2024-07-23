import { Component } from '@angular/core';
import { ApiService } from '../api.service';

interface ApiParam {
  key: string;
  value: string;
}

interface ApiHeader {
  key: string;
  value: string;
}

interface ChainParam {
  key: string;
  sourceKey: string;
}

interface Api {
  method: string;
  url: string;
  params: ApiParam[];
  headers: ApiHeader[];
  jsonBody: string;
  xmlBody: string;
  chainParams: ChainParam[];
}

interface ApiResponse {
  body: any;
  status_code: number;
  content_type: string;
}

@Component({
  selector: 'app-api-integration',
  templateUrl: './api-integration.component.html',
  styleUrls: ['./api-integration.component.css']
})
export class ApiIntegrationComponent {
  apis: Api[] = [
    { method: 'GET', url: '', params: [], headers: [], jsonBody: '', xmlBody: '', chainParams: [] }
  ];
  responses: ApiResponse[] = [];

  constructor(private apiService: ApiService) { }

  addApi() {
    this.apis.push({ method: 'GET', url: '', params: [], headers: [], jsonBody: '', xmlBody: '', chainParams: [] });
  }

  removeApi(index: number) {
    this.apis.splice(index, 1);
  }

  runTests() {
    const results: ApiResponse[] = [];

    const executeApi = (index: number) => {
      if (index >= this.apis.length) {
        this.responses = results;
        return;
      }

      const api = this.apis[index];

      // Replace chain parameters with actual values from the previous API response
      if (index > 0) {
        const previousApiResponse: ApiResponse = results[index - 1];
        api.chainParams.forEach((chainParam: ChainParam) => {
          const value: any = this.searchKeyInJson(previousApiResponse.body, chainParam.sourceKey);
          if (value) {
            const param: ApiParam | undefined = api.params.find((p: ApiParam) => p.key === chainParam.key);
            if (param) {
              param.value = value;
            }
          }
        });
      }

      const formattedApi: any = {
        ...api,
        body: api.method === 'POST' || api.method === 'PUT' ? api.jsonBody : ''
      };

      this.apiService.runTests([formattedApi]).subscribe((data: { responses: ApiResponse[] }) => {
        results.push(data.responses[0]);
        executeApi(index + 1);
      });
    };

    executeApi(0);
  }

  // Function to search for a key in a JSON object
  searchKeyInJson(obj: any, key: string): any {
    if (!obj || typeof obj !== 'object') return null;
    if (obj.hasOwnProperty(key)) return obj[key];

    for (const k in obj) {
      if (obj.hasOwnProperty(k) && typeof obj[k] === 'object') {
        const result: any = this.searchKeyInJson(obj[k], key);
        if (result) return result;
      }
    }

    return null;
  }
}

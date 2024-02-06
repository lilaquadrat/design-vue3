import { useTranslations } from '@/plugins/translations';
import type { ErrorObject } from 'ajv';

const {translate} = useTranslations();

export interface TranslatedPath {
  path?: string,
  values?: string[]|number[]
}

export interface ParsedError {
    path: string
    translatedPath: TranslatedPath
    parentPath?: TranslatedPath
    error: string
    keyword: string
}

export interface ErrorsObject {
  [key: string]: ParsedError | Record<string, ParsedError>
}

export default class ActionNotice {
  error: any;

  static parse (errors: ErrorObject[], translationPre?: string): ErrorsObject {

    const parsedErrors: ErrorsObject = {};

    errors?.forEach((single) => {

      ActionNotice.parseSingle(single, translationPre, parsedErrors);

    });

    console.log(parsedErrors);

    return parsedErrors;

  }

  static parseSingle (error: ErrorObject, translationPre: string | undefined, errors: ErrorsObject) {

    const pathArray = error.instancePath.split('/').filter((single) => single);
    // check if the second element is a number, to determine if we are inside of a array
    const arrayElementIndex = !Number.isNaN(pathArray[1]) ? +pathArray[1] + 1 : null;
    const messageResponse = ActionNotice.getParsedError(error, pathArray[0], undefined, translationPre);
    const path = messageResponse.path || pathArray[0];

    /**
    pathArray has a number as second element and a element after this number
    only a numbers would mean that the array needs to have a valid element
    ```JSON
    {
      instancePath: "/categories/0",
      schemaPath: "#/properties/categories/items/required",
      keyword: "required"
    }
    ```
    */

    if (arrayElementIndex) {

      const arrayMessageResponse = ActionNotice.getParsedError(error, pathArray[0], pathArray[0], translationPre);
      const useKey = `${pathArray[0]}-elements`;
      const useIndex = (arrayElementIndex - 1).toString();
      let useError = errors[useKey] as unknown as Record<string, Record<string, ParsedError>>;

      if (!useError) useError = {} as Record<string, Record<string, ParsedError>>;

      if (!useError[useIndex]) useError[useIndex] = {};

      useError[useIndex][path] = arrayMessageResponse;

    } else {

      errors[path] = messageResponse;

    }

  }

  static getParsedError (error: ErrorObject, usePath: string, basePath: string | undefined, translationPre: string | undefined): ParsedError {

    let message: string = '';
    let path = usePath;
    let translatedPath: string = '';

    if (error.keyword === 'type') {

      message = translate.translate(
        `validation-error-type-${error.params.type}`,
      );

    }

    if (error.keyword === 'minLength' || error.keyword === 'maxLength') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        Object.values(error.params),
      );

    }

    if (error.keyword === 'maxItems' || error.keyword === 'minItems') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        Object.values(error.params),
      );

    }

    if (error.keyword === 'contains') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        Object.values(error.params),
      );

    }

    if (error.keyword === 'additionalProperties') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        Object.values(error.params),
      );

      translatedPath = 'main';

    }

    if (error.keyword === 'required') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        Object.values(error.params),
      );

      translatedPath = '';
      path = error.params.missingProperty;

    }

    if (error.keyword === 'enum') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        [Object.values(error.params).join(',')],
      );

    }

    if (error.keyword === 'DOCUMENT_ALREADY_EXISTS') {

      message = translate.translate(
        `validation-error-${error.keyword}`,
        Object.values(error.params),
      );

      translatedPath = 'main';
      path = 'id';

    }

    if (!message) {

      message = translate.translate(
        `validation-error-${error.keyword}`,
      );
      translatedPath = 'main';

    }

    if (!translatedPath) {

      const combinedPath = basePath ? `${basePath}-${path}` : path;

      translatedPath = translationPre ? `${translationPre}-${combinedPath}` : combinedPath as string;

    }

    return {
      error         : message,
      path,
      translatedPath: { path: translatedPath, values: Object.values(error.params) },
      keyword       : error.keyword,
    };

  }

  static reset () {

    return {};

  }

}

/** Error messages for validation from nestJS */

export const VALIDATION_ERRORS: Record<string, string> = {
     // empty fields
     'first_name should not be empty': 'El nombre es obligatorio',
     'last_name should not be empty': 'El apellido es obligatorio',
     'email should not be empty': 'El correo es obligatorio',
     'id_number should not be empty': 'La cédula es obligatoria',
     'birth_date should not be empty': 'La fecha de nacimiento es obligatoria',
     'gender should not be empty': 'El género es obligatorio',
     'phone should not be empty': 'El teléfono es obligatorio',

     // incorrect types
     'first_name must be a string': 'El nombre debe ser texto',
     'last_name must be a string': 'El apellido debe ser texto',
     'email must be an email': 'El correo electrónico no es válido',
     'id_number must be a string': 'La cédula debe ser texto',

     // format validations
     'birth_date must be a valid ISO 8601 date string': 'La fecha de nacimiento no es válida',
     'phone must be a valid phone number': 'El número de teléfono no es válido',
     'gender must be one of the following values: male, female, other': 'El género debe ser masculino, femenino u otro',

     // uniqueness
     'email must be unique': 'Este correo ya está registrado',
     'id_number must be unique': 'Esta cédula ya está registrada',
};

export const CONFLICT_ERRORS: Record<string, string> = {
     'Patient with id_number': 'Ya existe un paciente con esta cédula',
     'Patient with email': 'Ya existe un paciente con este correo',
     'Duplicate entry': 'Este registro ya existe en el sistema',
};

export const HTTP_ERRORS: Record<number, string> = {
     401: 'Tu sesión ha expirado. Por favor inicia sesión nuevamente',
     403: 'No tienes permisos para realizar esta acción',
     404: 'No se encontró el recurso solicitado',
     500: 'Error interno del servidor. Intenta nuevamente más tarde',
     502: 'Error de conexión con el servidor',
     503: 'El servicio no está disponible temporalmente',
};

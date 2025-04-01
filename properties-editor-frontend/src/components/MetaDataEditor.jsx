import React, { useState } from 'react';

const initialSchema = {
  type: 'object',
  properties: {
    mainBox: {
      type: 'object',
      properties: {
        insert_job: { type: 'string', required: true },
        job_type: { type: 'string', required: true, default: 'BOX' },
        owner: { type: 'string', required: true },
        permission: { type: 'string', required: true },
        date_conditions: { type: 'number', required: true },
        days_of_week: { type: 'string', required: true },
        start_times: { type: 'string', required: true },
        description: { type: 'string', required: true },
        alarm_if_fail: { type: 'number', required: true },
        alarm_if_terminated: { type: 'number', required: true },
        timezone: { type: 'string', required: true },
        group: { type: 'string', required: true },
        application: { type: 'string', required: true },
        properties: {
          type: 'array',
          items: {
            oneOf: [
              {
                type: 'object',
                title: 'BOX',
                properties: {
                  insert_job: { type: 'string', required: true },
                  job_type: { type: 'string', required: true, default: 'BOX' },
                  owner: { type: 'string', required: true },
                  permission: { type: 'string', required: true },
                  date_conditions: { type: 'number', required: true },
                  days_of_week: { type: 'string', required: true },
                  start_times: { type: 'string', required: true },
                  description: { type: 'string', required: true },
                  alarm_if_fail: { type: 'number', required: true },
                  alarm_if_terminated: { type: 'number', required: true },
                  timezone: { type: 'string', required: true },
                  group: { type: 'string', required: true },
                  application: { type: 'string', required: true }
                }
              },
              {
                type: 'object',
                title: 'CMD',
                properties: {
                  insert_job: { type: 'string', required: true },
                  box_name: { type: 'string', required: true },
                  command: { type: 'string', required: true },
                  machine: { type: 'string', required: true },
                  permission: { type: 'string', required: true },
                  condition: { type: 'string', required: true },
                  description: { type: 'string', required: true },
                  alarm_if_fail: { type: 'number', required: true },
                  alarm_if_terminated: { type: 'number', required: true }
                }
              },
              {
                type: 'object',
                title: 'FW',
                properties: {
                  insert_job: { type: 'string', required: true },
                  box_name: { type: 'string', required: true },
                  machine: { type: 'string', required: true },
                  permission: { type: 'string', required: true },
                  condition: { type: 'string', required: true },
                  description: { type: 'string', required: true },
                  term_run_time: { type: 'number', required: true },
                  max_run_alarm: { type: 'number', required: true },
                  priority: { type: 'number', required: true },
                  alarm_if_fail: { type: 'number', required: true },
                  alarm_if_terminated: { type: 'number', required: true }
                }
              }
            ]
          }
        }
      }
    }
  }
};

function MetaDataEditor() {
  const [schema, setSchema] = useState(initialSchema);
  const [formData, setFormData] = useState({ mainBox: {} });

  const handleInputChange = (path, value) => {
    const updatedData = { ...formData };
    let target = updatedData;
    const keys = path.split('.');
    keys.slice(0, -1).forEach(key => {
      target[key] = target[key] || {};
      target = target[key];
    });
    target[keys[keys.length - 1]] = value;
    setFormData(updatedData);
  };

  const renderInputs = (schema, path = "mainBox") => {
    return (
      <div className="ml-5 p-2 border-l-2 border-gray-300">
        {Object.entries(schema.properties).map(([key, value]) => (
          <div key={path + '.' + key} className="my-2">
            <label className="font-bold text-gray-800">{key}:</label>
            {Object.keys(value.properties || {}).length > 0 ? (
              <>{renderInputs(value, path + '.' + key)}</>
            ) : (
              <input
                type="text"
                className="border p-1 rounded w-full"
                value={formData[path]?.[key] || ""}
                onChange={(e) => handleInputChange(`${path}.${key}`, e.target.value)}
              />
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">MetaData Editor</h1>
      <div className="flex gap-10">
        <div className="w-2/3">
          {renderInputs(schema.properties.mainBox)}
        </div>
        <div className="w-1/3 p-4 bg-gray-100 rounded">
          <h2 className="text-xl font-semibold">Preview</h2>
          <pre className="mt-2 p-2 bg-white rounded border">{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    </div>
  );
}

export default MetaDataEditor;

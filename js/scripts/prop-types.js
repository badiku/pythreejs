var _ = require('underscore');

function ThreeType(typeName) {
    this.typeName = typeName;
    this.defaultValue = null;
    this.serialize = true;
}
_.extend(ThreeType.prototype, {
    getTraitlet: function() {
        if (this.typeName.toLowerCase() === 'this') {
            return 'This().tag(sync=True, **widget_serialization)';
        }
        return 'Instance(' + this.typeName + ', allow_none=True).tag(sync=True, **widget_serialization)';
    },
    getPropArrayName: function() {
        return 'three_properties';
    },
});

function ThreeTypeArray(typeName) {
    this.typeName = typeName;
    this.defaultValue = [];
    this.serialize = true;
}
_.extend(ThreeTypeArray.prototype, {
    getTraitlet: function() {
        if (this.typeName === 'this') {
            // return 'List(trait=This(), default_value=[]).tag(sync=True, **widget_serialization)';
            return 'Tuple().tag(sync=True, **widget_serialization)';
        }
        // return 'List(trait=Instance(' + this.typeName + ')).tag(sync=True, **widget_serialization)';
        return 'Tuple().tag(sync=True, **widget_serialization)';
    },
    getPropArrayName: function() {
        return 'three_array_properties';
    },
});

function ThreeTypeDict(typeName) {
    this.typeName = typeName;
    this.defaultValue = {};
    this.serialize = true;
}
_.extend(ThreeTypeDict.prototype, {
    getTraitlet: function() {
        if (this.typeName === 'this') {
            return 'Dict(This()).tag(sync=True, **widget_serialization)';
        }
        return 'Dict(Instance(' + this.typeName + ')).tag(sync=True, **widget_serialization)';
    },
    getPropArrayName: function() {
        return 'three_dict_properties';
    },
});

function Bool(defaultValue) {
    this.defaultValue = defaultValue;
}
_.extend(Bool.prototype, {
    getTraitlet: function() {
        var pyBoolValue = this.defaultValue ? 'True' : 'False';
        return 'Bool(' + pyBoolValue + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'scalar_properties';
    },
});

function Int(defaultValue) {
    this.defaultValue = defaultValue;
}
_.extend(Int.prototype, {
    getTraitlet: function() {
        return 'CInt(' + this.defaultValue + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'scalar_properties';
    },

});

function Float(defaultValue) {
    this.defaultValue = defaultValue;
}
_.extend(Float.prototype, {
    getTraitlet: function() {
        return 'CFloat(' + this.defaultValue + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'scalar_properties';
    },

});

function StringType(defaultValue) {
    this.defaultValue = defaultValue;
}
_.extend(StringType.prototype, {
    getTraitlet: function() {
        return 'Unicode("' + this.defaultValue + '").tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'scalar_properties';
    },

});

function Enum(enumTypeName, defaultValue) {
    this.enumTypeName = enumTypeName;
    this.defaultValue = defaultValue;
}
_.extend(Enum.prototype, {
    getTraitlet: function() {
        return 'Enum(' + this.enumTypeName + ', "' + this.defaultValue + '").tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'enum_properties';
    },
});

function Color(defaultValue) {
    this.defaultValue = defaultValue || "#ffffff";
}
_.extend(Color.prototype, {
    getTraitlet: function() {
        return 'Unicode(' + JSON.stringify(this.defaultValue) + ').tag(sync=True)'
    },
    getPropArrayName: function() {
        return 'color_properties';
    }
});

function ArrayType() {
    this.defaultValue = [];
}
_.extend(ArrayType.prototype, {
    getTraitlet: function() {
        return 'List().tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'array_properties';
    }
});

function DictType() {
    this.defaultValue = {};
}
_.extend(DictType.prototype, {
    getTraitlet: function() {
        return 'Dict().tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'dict_properties';
    }
});

function FunctionType(fn) {
    this.fn = fn;
}
_.extend(FunctionType.prototype, {
    getTraitlet: function() {
        return "Unicode('" + this.fn.toString() + "').tag(sync=True)";
    },
    getPropArrayName: function() {
        return 'function_properties';
    }
});

function Vector3(x, y, z) {
    this.defaultValue = [ x||0, y||0, z||0 ];
}
_.extend(Vector3.prototype, {
    getTraitlet: function() {
        return 'Vector3(default=' + JSON.stringify(this.defaultValue) + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'vector_properties';
    },
});

function Vector4(x, y, z, w) {
    this.defaultValue = [ x||0, y||0, z||0, w||0 ];
}
_.extend(Vector4.prototype, {
    getTraitlet: function() {
        return 'Vector4(default=' + JSON.stringify(this.defaultValue) + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'vector_properties';
    },
});

function Matrix3() {
    this.defaultValue = [
        1, 0, 0,
        0, 1, 0,
        0, 0, 1,
    ];

}
_.extend(Matrix3.prototype, {
    getTraitlet: function() {
        return 'Matrix3(default=' + JSON.stringify(this.defaultValue) + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'vector_properties';
    },
});

function Matrix4() {
    this.defaultValue = [
        1, 0, 0, 0, 
        0, 1, 0, 0, 
        0, 0, 1, 0, 
        0, 0, 0, 1 
    ];
} 
_.extend(Matrix4.prototype, {
    getTraitlet: function() {
        return 'Matrix4(default=' + JSON.stringify(this.defaultValue) + ').tag(sync=True)';
    },
    getPropArrayName: function() {
        return 'vector_properties';
    },
});


module.exports = {
    ThreeType: ThreeType,
    ThreeTypeArray: ThreeTypeArray,
    ThreeTypeDict: ThreeTypeDict,
    Int: Int,
    Float: Float,
    String: StringType,
    Bool: Bool,
    Enum: Enum,
    Color: Color,
    Array: ArrayType,
    Dict: DictType,
    Function: FunctionType,
    Vector3: Vector3,
    Vector4: Vector4,
    Matrix3: Matrix3,
    Matrix4: Matrix4,
};

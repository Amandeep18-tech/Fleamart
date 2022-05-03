package dal.edu.fleamart.postManagement.convertors;

public interface ITypeConvertor<S, T> {

	public T convert(S object);
	
}
